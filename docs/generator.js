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
                var configTomlString = `baseURL = "/"\nlanguageCode = "en-us"\ntitle = "${this.kennaName}"\ntheme = "${this.kennaTheme}"\nrelativeURLs = true\ndisableKinds = ["taxonomy", "taxonomyTerm", "section"]\n`;
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
            if (this.numClasses != 0) {
                for (let i = 0; i < this.numClasses; i++) {
                    var className = this.classNames[i].toLowerCase().replace(" ", "");
                    folders[i] = contentF.folder(className);
                    var mdString = `---\ntitle: "Your first assignment: use Kenna!"\ndate: ${date}\npublishdate: ${date}\nclass: "${className}"\ndraft: false\n---\n\n## Kenna is elegant.\nAnd handcrafted with love!`;
                    folders[i].file("post-1.md", mdString);
                    // generate list pages
                    var listPageString = `<!DOCTYPE html><html class="single"><head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>${this.classNames[i]} Updates</title>\n<link rel="stylesheet" href="../../css/main.css">\n</head>\n<body>\n<section>\n<div class="single-wrapper">\n<h1>${this.classNames[i]}</h1>\n<div class="custom-div"></div>\n<a href="../../index.html#main-information"><h2>&lt; Back to main</h2></a>\n{{ range (where .Site.Pages "Params.class" "${className}").ByDate.Reverse }}\n<a href="../../{{ .Permalink }}/index.html">\n<h2>{{ .Title }}</h2>\n</a>\n<p>{{ .Summary }} - {{ .Date.Format "02 January 2006" }}</p>\n{{ end }}\n</div>\n</section>\n</body>\n</html>`;
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
            // handle themes
            if (this.kennaTheme == "kenna-lavender"){
                var kennaTomlString = `name = "Kenna Lavender"\nlicense = "MIT"\nhomepage = "https://kewbish.github.io/kenna"\nmin_version = "0.41"\n[author]\n\tname = "Kewbish"\nhomepage = "https://kewbish.github.io"`;
                themesF.file("theme.toml", kennaTomlString);
                var themesLayoutsF = themesF.folder("layouts");
                var themesDefaultsF = themesLayoutsF.folder("_default");
                var themesDefaultBaseString = `<!DOCTYPE html><html>{{- partial "head.html" . -}}<body>{{- partial "header.html" . -}}<div id="content">{{- block "main" .}}{{- end}}</div>{{- partial "footer.html" . -}}</body></html>`;
                themesDefaultsF.file("baseof.html", themesDefaultBaseString);
                var themesDefaultListString = `<!DOCTYPE html><html lang="en" class="single"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>{{.Title}}</title> <link rel="stylesheet" href="../../../css/main.css"></head><body> <section> <div class="single-wrapper"> <div> <h1>{{.Title}}Posts</h1> <div class="custom-div"></div><a href="../../index.html#main-information"><p>&lt; Back to main</p></a>{{range (where .Site.Pages "Params.class" "${this.classNames[0].toLowerCase().replace(" ", "")}").ByDate.Reverse}}<a href="{{.Permalink}}"> <h2>{{.Title}}</h2> </a> <p>{{.Summary}}-{{.Date.Format "02 January 2006"}}</p>{{end}}</div></div></section></body></html>`;
                themesDefaultsF.file("list.html", themesDefaultListString);
                var themesDefaultSingleString = `<!DOCTYPE html><html lang="en" class="single"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>{{.Title}}</title> <link rel="stylesheet" href="../../../css/main.css"></head><body> <section> <div class="single-wrapper"> <h1>{{.Title}}</h1> <p>Due {{.Date.Format "02 January 2006"}}</p><div class="custom-div"></div><a href="../../../index.html#main-information"><p>&lt; Back to main</p></a>{{.Content}}</div></section></body></html>`;
                themesDefaultsF.file("single.html", themesDefaultSingleString);
                var themesPartialsF = themesLayoutsF.folder("partials");
                themesPartialsF.file("footer.html", " ");
                themesPartialsF.file("head.html", " ");
                themesPartialsF.file("header.html", " ");
                var themesLayouts404String = `<!DOCTYPE html>\n<html lang="en" class="single">\n<head>\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Page Not Found</title>\n<link rel="stylesheet" href="../../../css/main.css">\n</head>\n<body>\n<section>\n<div class="single-wrapper">\n<h1>Oops!</h1>\n<p>An error occurred - this page doesn't exist.</p>\n<a href="../../../index.html#main-information"><p>&lt; Back to main</p></a>\n<div class="custom-div"></div>\n</div>\n</section>\n</body>\n</html>`;
                themesLayoutsF.file("404.html", themesLayouts404String);
                var themeIndexButtonString = ``;
                for (let i = 0; i < this.classNames.length; i++) {
                    themeIndexButtonString += `<td><a href="/${this.classNames[i].toLowerCase().replace(" ", "")}\\index.html"><button>${this.classNames[i]}</button></a></td>`;
                }
                var themeIndexClassesString = ``;
                for (let i = 0; i < this.classNames.length; i++) {
                    themeIndexClassesString += `<div><h1>${this.classNames[i]}</h1> <div class="custom-div"></div>{{range first 3 (where .Site.Pages "Params.class" "${this.classNames[i].toLowerCase().replace(" ", "")}").ByDate.Reverse}}<a href="{{.Permalink}}/index.html"> <h2>{{.Title}}</h2> </a> <p>{{.Summary}}-{{.Date.Format "02 January 2006"}}</p>{{end}}</div> `;
                }
                var themeIndexString = `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>${this.kennaName}</title> <link rel="stylesheet" href="css/main.css"></head><body> <section> <div class="header"> <div class="header-inner"> <h1>${this.kennaName}</h1> <p>${this.kennaDesc}</p><table> <tr>${themeIndexButtonString}</tr></table> </div></div></section> <section> <div class="main-split" id="main-information">${themeIndexClassesString}<div> <h1>Contact Me</h1> <div class="custom-div"></div><p>My email, as you all know, is <a href="mailto:${this.email}">${this.email}</a>. Please do not hesitate to let me know if you need any help, or reach out to one of your peers!</p></div></div></section> <section> <div class="footer"> <div> <p><a href="https://github.com/kewbish/kenna">Kenna</a> by <a href="https://kewbish.github.io">Kewbish</a>.</p></div></div></section></body></html>`;
                themesLayoutsF.file("index.html", themeIndexString);
                var themesStaticF = themesF.folder("static");
                var themesStaticCssF = themesStaticF.folder("css");
                var themesStaticCssString = `@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Montserrat&display=swap');:root{--cover-gradient: #6a45807e; --background-shadow: #3d214d; --button-background: #6a45807e; --base-one: black; --base-two: white; --color-one: #9873c2; --color-two: #ba97e2; --font-one: Montserrat; --font-two: "Abril Fatface"; --back-image: url("https://images.unsplash.com/photo-1477511801984-4ad318ed9846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80");}*{padding: 0; margin: 0;}html{background-color: var(--base-two); font-family: var(--font-one);}h1{font-family: var(--font-two); font-size: 50px; letter-spacing: 2.2px; padding: 5px;}h2{font-family: var(--font-one); font-size: 24px; margin: 5px; padding: 5px;}p{font-family: var(--font-one); font-size: 20px; margin: 5px; padding: 5px;}a{width: 100%;}.custom-div{border-bottom: 1px var(--base-one) solid; padding-right: 10px; margin-bottom: 10px;}.header{display: flex; justify-content: center; flex-direction: column; background-image: linear-gradient(var(--cover-gradient), var(--cover-gradient)), var(--back-image); background-size: cover; height: 70vh; color: var(--base-two); padding: 8%;}.header-inner h1{text-shadow: 3px 3px 3px var(--color-one);}.header-inner{background-image: linear-gradient(var(--cover-gradient), var(--cover-gradient)); box-shadow: 15px 15px var(--background-shadow); padding: 20px;}button{background-color: var(--button-background);border-radius: 28px;border: 1px solid var(--base-two);display: inline-block; color: var(--base-two); margin: 5px; padding: 15px 30px; font-family: var(--font-one); font-size: 20px; box-sizing: border-box; cursor: pointer;}.main-split{display: grid; grid-template-columns: 1fr 1fr; grid-column-gap: 30px; padding: 5%;}.footer{background-color: var(--color-two); padding: 30px;}.footer div{background-color: var(--base-two); box-shadow: 15px 15px var(--color-one); padding: 10px;}.single{/*background-color: var(--color-two);*/ background-image: linear-gradient(var(--cover-gradient), var(--cover-gradient)), var(--back-image); background-size: cover;}.single-wrapper{margin: 3%; padding: 10px; background-color: var(--base-two); box-shadow: 15px 15px var(--color-one);}.single-wrapper div{padding: 0 10px;}`;
                themesStaticCssF.file("main.css", themesStaticCssString);
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