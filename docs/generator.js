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