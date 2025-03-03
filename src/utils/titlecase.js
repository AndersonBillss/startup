export function toTitleCase(str) {
    if(!str){
        return ""
    }
    const excludeWords = ["a", "an", "the", "of", "and", "but", "or", "for", "nor", "on", "at", "to", "by", "with"];

    return str
        .toLowerCase()
        .split(" ")
        .map((word, index) => 
            (index === 0 || !excludeWords.includes(word)) 
                ? word.charAt(0).toUpperCase() + word.slice(1) 
                : word
        )
        .join(" ");
}