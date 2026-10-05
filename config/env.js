const requiredEnvVariables = [
    "MONGO_URI",
    "JWT_SECRET"
];

for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        throw new Error(`${variable} is missing`);
    }
}

