import fs from "fs";
import pasth from "path";
import axios from "axios";

export async function savFile(file, type = "image") {
    const filePath = Date.now() + "." + file.originalname.split(".").pop();
    const savePath = pasth.join("storage", type, filePath);
    fs.writeFileSync(savePath, file.buffer);

    try {
        const respones = await axios.post(`${process.env.QUAX_ENDPOINT}/upload`,file.buffer, {
            headers : {
                "Content-Type": file.mimetype,
                "Authorization": `Bearer ${process.env.QUAX_TOKEN}`, // kalau pakai token
                "X-File-Type": type, // kasih info type (image/video)
                "X-File-Name": filename, // kasih info nama file
            },
        })
        return {
            internal : `/storage/${type}/${filename}`,
            external : respones.data.url, // url dari quax
        }
    } catch (err) {        console.error("Error uploading to Quax:", err);
        return {
            internal : `/storage/${type}/${filename}`,
            external : null, // fallback ke url lokal
        }
    }
}