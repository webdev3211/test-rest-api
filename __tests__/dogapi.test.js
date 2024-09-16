const express = require('express');
const request = require('supertest');
const dogapi = require('../routes/dogapi');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/dog', dogapi);

jest.mock('fs', () => ({
    ...jest.requireActual('fs'),
    unlink: jest.fn((filePath, callback) => callback(null)),
    rename: jest.fn((oldPath, newPath, callback) => callback(null)),
    access: jest.fn((filePath, mode, callback) => callback(null)),
    readdir: jest.fn((dir, callback) => callback(null, ['mockedFile.jpg'])),
    readFile: jest.fn((filePath, encoding, callback) => callback(null, 'file content'))
}));

jest.mock('multer', () => {
    const multer = jest.fn(() => ({
        single: jest.fn((field) => (req, res, next) => {
            req.file = {
                filename: 'mockedFile.jpg',
                path: 'mock/path/to/file'
            };
            next();
        })
    }));
    multer.diskStorage = jest.fn();
    return multer;
});

describe('Dog Image Management API', () => {
    it('should upload a dog image', async () => {
        const response = await request(app)
            .post('/dog/upload')
            .attach('dog', Buffer.from('file content'), 'file.jpg');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            success: true,
            message: 'File uploaded successfully',
            id: 'mockedFile.jpg'
        });
    });

    it('should delete a dog image', async () => {
        const response = await request(app)
            .delete('/dog/delete/mockFile.jpg');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'File deleted successfully'
        });
    });

    it('should update a dog image', async () => {
        const response = await request(app)
            .put('/dog/update/oldFile.jpg')
            .attach('dog', Buffer.from('updated content'), 'updatedFile.jpg');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'File updated successfully',
            id: 'mockedFile.jpg'
        });
    });

    it('should fetch a dog image file by id', async () => {
        const response = await request(app)
            .get('/dog/fetchMe.jpg');

        expect(response.status).toBe(200);
        expect(response.text).toBe(undefined);
    });

    it('should list all uploaded dog images', async () => {
        const response = await request(app)
            .get('/dog/');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'List of uploaded dog images',
            files: ['mockedFile.jpg']
        });
    });
});