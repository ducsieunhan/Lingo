const checkType = (resourceContent) => {
    if (typeof resourceContent === "string" && resourceContent.includes("null")) {
        // console.log("catch null")
        return "null";
    }
    try {
        new URL(resourceContent);
        return "url";
    } catch {
        return "paragraph";
    }
}
export { checkType }