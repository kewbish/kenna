const app = new Vue({
    el: '#gen',
    data: {
        numClasses: 3,
        classNames: [

        ],
        email: "",
        kennaTheme: "",
        kennaName: "",
        kennaDesc: ""
    },
    methods: {
        generateZip: function () {
            return false;
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