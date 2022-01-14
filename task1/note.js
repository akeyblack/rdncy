
function Node (name, content, type) {
    this.name = name;
    this.content = content;
    this.type = type;
    this.created = moment().format("LL");
    this.dates = content.match(/\d{2}([\/.-])\d{2}\1\d{4}/g) || "";

}