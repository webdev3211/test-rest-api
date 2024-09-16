const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}${ext}`);
    }
});

const upload = multer({ storage: storage });

// Upload a dog image
router.post('/upload', upload.single('dog'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            error: 'No file uploaded.'
        });
    }
    res.status(201).json({
        success: true,
        message: 'File uploaded successfully',
        id: req.file.filename
    });
});


// Delete a dog image
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const filePath = path.join(__dirname, '../public/uploads', id);

    fs.unlink(filePath, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({
                    error: 'File not found',
                    success: false
                });
            }
            else {
                return res.status(500).json({
                    error: 'Something went wrong while deleting the file',
                    success: false
                });
            }
        }
        res.status(200).json({
            success: true,
            message: 'File deleted successfully'
        });
    });
});


// Update a dog image
router.put('/update/:id', upload.single('dog'), (req, res) => {
    const { id } = req.params;
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const oldFilePath = path.join(__dirname, '../public/uploads', id);
    const newFilePath = path.join(__dirname, '../public/uploads', req.file.filename);

    fs.access(oldFilePath, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.unlink(oldFilePath, (unlinkErr) => {
                if (unlinkErr) {
                    return res.status(500).json({
                        success: false,
                        error: 'Error deleting old file.'
                    });
                }
                // Move the newly uploaded file
                fs.rename(req.file.path, newFilePath, (renameErr) => {
                    if (renameErr) {
                        return res.status(500).json({
                            success: false,
                            error: 'Error updating file.'
                        });
                    }
                    res.status(200).json({
                        success: true,
                        message: 'File updated successfully',
                        id: req.file.filename
                    });
                });
            });
        } else {
            // If the old file doesn't exist, just rename the new file
            fs.rename(req.file.path, newFilePath, (renameErr) => {
                if (renameErr) {
                    return res.status(500).json({
                        success: false,
                        error: 'Error updating file.'
                    });
                }
                res.status(200).json({
                    success: true,
                    message: 'File updated successfully',
                    id: req.file.filename
                });
            });
        }
    });
});



// Fetch dog image file by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const filePath = path.join(__dirname, '../public/uploads', id);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({
                success: false,
                error: 'No such file exists'
            });
        }
        res.sendFile(filePath);
    });
});



// Fetch a list of uploaded dogs 
router.get('/', async (req, res) => {
    const uploadPath = path.join(__dirname, '../public/uploads');
    fs.readdir(uploadPath, (err, files) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: 'Error fetching file list.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'List of uploaded dog images',
            files: files
        });
    });
});



module.exports = router;