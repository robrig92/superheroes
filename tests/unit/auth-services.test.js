const authService = require('../../server/services/auth');
const PasswordsUtils = require('../../server/utils/passwords');
const usersRepository = require('../../server/repositories/user');

test('Correct login when correct credentials', async () => {
    try {
        const credentials = {
            username: 'username',
            password: '1234567890'
        };

        const resp = {
            username: 'username',
            name: 'user name',
            password: '1234567890',
            active: true
        };

        usersRepository.findByUsername = jest.fn().mockResolvedValue(resp);

        PasswordsUtils.compare = jest.fn().mockImplementation((value, target) => {
            return true;
        });

        const response = await authService.auth(credentials);

        expect(response.username).toBe('username');
    } catch (error) {
        console.log(error);
    }
});

test('No login when invalid credentials', async () => {
    try {
        const credentials = {
            username: 'username',
            password: '11234567890'
        };

        const resp = null;

        usersRepository.findByUsername = jest.fn().mockResolvedValue(resp);

        const response = await authService.auth(credentials);

        expect(response).toBeNull();

    } catch(error) {
        console.log(error);
    }
});
