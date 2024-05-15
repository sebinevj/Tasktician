module.exports = class User {
    id = null;
    email = null;
    first_name = null;
    last_name = null;
    username = null;
    #passwordHash = null;
    #salt = null;

    constructor(data) {
        this.id = data.user_id;
        this.email = data.email;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.username = data.user_name;
        this.#salt = data.usr_salt;
        this.#passwordHash = data.usr_password;
    }

    validatePassword(password) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, this.#salt, 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) { //problem computing digest, like hash function not available
                reject("Error: " +err);
            }

            const digest = derivedKey.toString('hex');
            if (this.#passwordHash == digest) {
                resolve(this);
            }
            else {
                reject("Invalid username or password");
            }
            });
        });
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            first_name: this.first_name,
            last_name: this.last_name,
            username: this.username
        }
    }
};