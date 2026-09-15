import { useEffect } from "react";

export default function Seo({ title, description, schema }) {
    useEffect(() => {
        if (title) document.title = `${title} • Glitz Club`;
        if (description) {
            let meta = document.querySelector('meta[name="description"]');
            if (!meta) {
                meta = document.createElement("meta");
                meta.name = "description";
                document.head.appendChild(meta);
            }
            meta.content = description;
        }
        let scriptTag = document.getElementById("glitz-schema-jsonld");
        if (schema) {
            if (!scriptTag) {
                scriptTag = document.createElement("script");
                scriptTag.id = "glitz-schema-jsonld";
                scriptTag.type = "application/ld+json";
                document.head.appendChild(scriptTag);
            }
            scriptTag.textContent = JSON.stringify(schema);
        } else if (scriptTag) {
            scriptTag.remove();
        }
    }, [title, description, schema]);

    return null;
}
