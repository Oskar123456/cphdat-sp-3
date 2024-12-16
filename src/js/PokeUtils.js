const habitatImageLinks = {
    grassland: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpics.craiyon.com%2F2023-12-05%2FjeR-wXkaTWeDD1kiUkFtMA.webp&f=1&nofb=1&ipt=56633f31d666d4da599251b93143a11351ce97b99d1a845171b4a0fd514660c1&ipo=images",
    mountain: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fthumb_back%2Ffw800%2Fbackground%2F20230516%2Fpngtree-animated-mountains-landscape-wallpaper-4k-and-1080p-2px-image_2565761.jpg&f=1&nofb=1&ipt=c32a8cd352a782e872357f10573185982cfa0a145c2cec32b45f0ed8622d936d&ipo=images",
    forest: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas2.ftcdn.net%2Fv2%2Fjpg%2F05%2F41%2F35%2F79%2F1000_F_541357914_LeyK2LaNqvfft6JmabJW1424oXCRBcV0.jpg&f=1&nofb=1&ipt=e729ff20a46ec0721696b3950a6cca547cc39b6f8b4e1cc88b4f6d5d87bd3475&ipo=images",
    waters_edge: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas1.ftcdn.net%2Fv2%2Fjpg%2F05%2F60%2F01%2F12%2F1000_F_560011279_d7Koa3lB2TvWLwBBUYJoKdgqtTEIqbF8.jpg&f=1&nofb=1&ipt=2088488c40f9d9ea01ec9f209e96ebca32b5bacf3dd7620794b596673c2a9ff6&ipo=images",
};

function habitatImageLink(habitat) {
    return habitatImageLinks[habitat.name.toLowerCase().replace("-", "_")];
}

function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}

function equalizeStrLens(strs) {
    const strs_new = [];
    let maxlen = 0;
    for (let s of strs)
        if (s.length > maxlen) maxlen = s.length;
    for (let s of strs)
        strs_new.push(s + " ".repeat(Math.max(0, maxlen - s.length)));
    return strs_new;
}

export { capitalizeWord, equalizeStrLens };
export { habitatImageLink };
    

