
const PasswordsUtils = require('../../server/utils/passwords');

test('Correct password hash validation', () => {
    const password = 'qwerty';
    const hash = '$2b$10$IUeHnuu7.Mb2B0TrbDdpKOg210jdzwVWWEXA3w9/q58E7EbaoejZe';

    expect(PasswordsUtils.compare(password, hash)).toBe(true);
});

test('Password hash validation fails when password is not the correct', () => {
    const password = 'asdfgh';
    // Correct password qwerty.
    const hash = '$2b$10$IUeHnuu7.Mb2B0TrbDdpKOg210jdzwVWWEXA3w9/q58E7EbaoejZe';

    expect(PasswordsUtils.compare(password, hash)).toBe(false);
});
