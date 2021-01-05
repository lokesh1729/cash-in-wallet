module.exports = {
    purge: ["./src/**/*.js", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            flex: {
                "20p": "1 1 20%",
                "30p": "1 1 30%",
                "40p": "1 1 40%",
            },
            height: {
                108: "27rem",
                120: "30rem",
                144: "36rem",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
    important: true,
};
