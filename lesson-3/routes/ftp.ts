import express, { Router } from 'express';
import fs, { createReadStream } from 'fs';
import path from 'path';

export const ftpRouter: Router = express.Router();

interface DirectoryItem {
    type: "directory" | "file",
    name: string
}

const rootPath = process.cwd();

ftpRouter.get('/', async (req, res) => {
    const title = "FTP";

    const selectedPath = !req.query.path ? "" : (req.query.path as string);
    const fullPath = path.join(rootPath, selectedPath);

    if (isFile(fullPath)) {
        const fileContent = await readFile(fullPath);
        res.render('ftp', {
            title,
            path: selectedPath,
            file: fileContent,
            items: []
        });

        return;
    }

    const listItems = fs.readdirSync(path.join(rootPath, selectedPath));

    res.render('ftp', {
        title,
        path: selectedPath,
        file: "",
        items: getDirectoryItems(fullPath, listItems)
                .sort((a, b) => {
                    if (a.type !== b.type && a.type === "directory")
                        return -1;
                    else {
                        return a.name.localeCompare(b.name);
                    }
                })
    });
})

function isFile(fullPath: string): boolean {
    return fs.lstatSync(fullPath).isFile();
}

function getDirectoryItems(pathToDirectory: string, nameItems: string[]): DirectoryItem[] {
    return nameItems.map(item => {
        const fullPath = path.join(pathToDirectory, item);
        return {
            type: isFile(fullPath) ? "file" : "directory",
            name: item
        }
    });
}

function readFile(fullPath: string): Promise<string> {
    const readStream = createReadStream(fullPath, { encoding: 'utf-8' });

    return new Promise((resolve, reject) => {
        readStream.on('data', (chunk) => resolve(chunk.toString()));
        readStream.on('error', (error) => reject(error.message))
    })
}