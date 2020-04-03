const app = new Vue({
    el: '#gen',
    data: {
        numClasses: 3,
        classNames: [
            "English", "Humanities", "Art"
        ],
        email: "hello@kenna.com",
        ghName: "kenna",
        kennaTheme: "kenna-lavender",
        kennaName: "Kenna Academy",
        kennaDesc: "Built with 💖 with Kenna"
    },
    methods: {
        generateZip: function () {
            // setup
            var zip = new JSZip();
            // generate config.toml string
            if (this.kennaName != "" || this.kennaTheme != "") {
                var configTomlString = `baseURL = "/"\nlanguageCode = "en-us"\ntitle = ${this.kennaName}\ntheme = ${this.kennaTheme}\nrelativeURLs = true\ndisableKinds = ["taxonomy", "taxonomyTerm", "section"]\n`;
                zip.file("config.toml", configTomlString);
            }
            else {
                alert("Some information is missing - please check and resubmit!");
            }
            // generate content folder
            var contentF = zip.folder("content");
            // generate placeholder markdowns and subfolders
            var folders = []
            var date = new Date().toISOString();
            if (this.numClasses != []) {
                for (let i = 0; i < this.numClasses; i++) {
                    var className = this.classNames[i].toLowerCase().replace(" ", "");
                    folders[i] = contentF.folder(className);
                    var mdString = `---\ntitle: "Your first assignment: use Kenna!"\ndate: ${date}\npublishdate: ${date}\nclass: "${className}"\ndraft: false\n---\n\n## Kenna is elegant.\nAnd handcrafted with love!`;
                    folders[i].file("post-1.md", mdString);
                    // generate list pages
                    var listPageString = `<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>${this.classNames[i]} Updates</title>\n<link rel="stylesheet" href="../../css/main.css">\n</head>\n<body>\n<section>\n<div class="single-wrapper">\n<h1>${this.classNames[i]}</h1>\n<div class="custom-div"></div>\n<a href="../../index.html#main-information"><h2>&lt; Back to main</h2></a>\n{{ range (where .Site.Pages "Params.class" "${className}").ByDate.Reverse }}\n<a href="../../{{ .Permalink }}/index.html">\n<h2>{{ .Title }}</h2>\n</a>\n<p>{{ .Summary }} - {{ .Date.Format "02 January 2006" }}</p>\n{{ end }}\n</div>\n</section>\n</body>\n</html>`;
                    contentF.file(`${className}.html`, listPageString);
                }
            }
            else {
                alert("Some information is missing - please check and resubmit!");
            }
            // generate archetypes folder
            var archetypesF = zip.folder("archetypes");
            var archetypesDefaultString = `---\ntitle: "{{ replace .Name "-" " " | title }}"\ndate: {{ .Date }}\npublishdate: {{ .Date }}\nclass: "${className}"\n---\n`;
            archetypesF.file("default.md", archetypesDefaultString);
            // generate themes folder
            var themesTF = zip.folder(`themes`);
            var themesF = themesTF.folder(`${this.kennaTheme}`);
            var themesArchetypesF = themesF.folder("archetypes");
            themesArchetypesF.file("default.md","+++\n+++");
            // add Hugo binary
            zip.loadAsync(hugoBinaryString, {base64: true, createFolders: true}).then(function(z){
                zip.file("hugo.exe").async("string");
            });
            if (this.kennaTheme == "kenna-lavender"){
                var kennaTomlString = `name = "Kenna Lavender"\nlicense = "MIT"\nhomepage = "https://kewbish.github.io/kenna"\nmin_version = "0.41"\n[author]\n\tname = "Kewbish"\nhomepage = "https://kewbish.github.io"`;
                themesF.file("theme.toml", kennaTomlString);
                var themesLayoutsF = themesF.folder("layouts");
                var themesLayouts404String = `<!DOCTYPE html>\n<html lang="en" class="single">\n<head>\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Page Not Found</title>\n<link rel="stylesheet" href="../../../css/main.css">\n</head>\n<body>\n<section>\n<div class="single-wrapper">\n<h1>Oops!</h1>\n<p>An error occurred - this page doesn't exist.</p>\n<a href="../../../index.html#main-information"><p>&lt; Back to main</p></a>\n<div class="custom-div"></div>\n</div>\n</section>\n</body>\n</html>`;
                themesLayoutsF.file("404.html", themesLayouts404String);
                // ! implement layouts index.html
                var themesLayoutsIndexString = "";
                themesLayoutsF.file("index.html", themesLayoutsIndexString);
                var themesStaticF = themesF.folder("static");
                var themesStaticAdminF = themesStaticF.folder("admin");
                var themesStaticAdminConfigSub = ``;
                for (let i = 0; i < this.classNames.length; i++) {
                    themesStaticAdminConfigSub += `\n- name: '${this.classNames[i].toLowerCase().replace(" ","")}'\n\tlabel: 'Kenna Post - ${this.classNames[i]}'\n\tfolder: 'content/${this.classNames[i].toLowerCase().replace(" ","")}'\n\tcreate: true\n\tslug: "{{year}}{{month}}{{day}}-{{slug}}"\n\teditor:\n\t\tpreview: true\n\tfields:\n\t\t- { label: 'Title', name: 'title', widget: 'string' }\n\t\t- { label: 'Publish Date', name: 'publishdate', widget: 'datetime' }\n\t\t- { label: 'Due Date', name: 'date', widget: 'datetime' }\n\t\t- { label: 'Class', name: class, widget: 'string' }\n\t\t- { label: 'Body', name: 'body', widget: 'markdown' }`;
                }
                var themesStaticAdminConfig = `backend:\n\tname: github\n\trepo: ${this.ghName}/${this.ghName}.github.io\nmedia_folder: static/img\ncollections:` + themesStaticAdminConfigSub;
                themesStaticAdminF.file("config.yml", themesStaticAdminConfig);
                var themesStaticAdminString = `<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n<title>Content Manager - Admin Section</title>\n<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>\n</head>\n\n<body>\n<script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>\n</body>\n</html>`;
                themesStaticAdminF.file("index.html", themesStaticAdminString);
            }
            // generate zip
            zip.generateAsync({ type: "blob" })
                .then(function (content) {
                    saveAs(content, "kenna.zip");
                });
            console.log("Success.");
        }
    },
    computed: {
        intClasses() {
            if (this.numClasses == "") {
                return 1
            }
            else {
                return parseInt(this.numClasses)
            }
        }
    }
});