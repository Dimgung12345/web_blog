import fs from "fs";
import path from "path";
import axios from "axios";

export async function saveFileHybrid(file, type = "image") {
    const extension = file.originalname.split(".").pop();
    const filename = `${Date.now()}.${extension}`;
    const savePath = path.join("storage", type, filename);
    const internalPath = `/storage/${type}/${filename}`;

    // Save to local storage
    fs.writeFileSync(savePath, file.buffer);

    try {
        const response = await axios.post(`${process.env.QUAX_ENDPOINT}/upload`, file.buffer, {
            headers: {
                "Content-Type": file.mimetype,
                "Authorization": `Bearer ${process.env.QUAX_TOKEN}`,
                "X-File-Type": type,
                "X-File-Name": filename,
            },
        });

        return {
            internal: internalPath,
            external: response.data.url,
        };
    } catch (err) {
        console.error("Error uploading to Quax:", err);
        return {
            internal: internalPath,
            external: null,
        };
    }
}