const mongoose = require('mongoose');

const File = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

//criando um campo virtual, não existe na tabela do mongo, mas sim no lado do backend
File.virtual('url').get(function () {
    const url = process.env.URL ||

        process.env.PORT || 'http://localhost:3333'

    return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model("File", File);
