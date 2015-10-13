var FormSubmitter = (function () {

    var defaults = {
        overrideSubmit: true,
        onSubmit: null,
        onProcessData: null,
        onSuccess: function(){},
        onError: function(){},
        method: "POST",
        url: "",
        dataType : "json",
        form : null //required
    };

    function create(options) {
        var formSubmitter = {};
        formSubmitter.options = Object.assign({}, defaults, options);
        bind(formSubmitter);
        formSubmitter.init();
        return formSubmitter;
    }

    function bind(formSubmitter) {
        formSubmitter.init = init.bind(formSubmitter);
        formSubmitter.cacheDom = cacheDom.bind(formSubmitter);
        formSubmitter.attachEvents = attachEvents.bind(formSubmitter);
        formSubmitter.nativeSubmitHandler = nativeSubmitHandler.bind(formSubmitter);
        formSubmitter.submit = submit.bind(formSubmitter);
    }

    function cacheDom() {
        this.dom = {};
        this.dom.form = this.options.form;
    }

    function attachEvents() {
        if (this.options.overrideSubmit) {
            this.dom.form.addEventListener("submit", this.nativeSubmitHandler);
        }
    }
    function nativeSubmitHandler(e) {
        e.preventDefault();
        this.submit(e.target);
    }
    function submit(form) {
        var formData = getFormData(form);
        var shouldSubmit = true;

        if (this.options.onProcessData) {
            formData = this.options.onProcessData(formData);
        }
        if (this.options.onSubmit) {
            shouldSubmit = this.options.onSubmit(formData);
        }
        if(shouldSubmit){
            $.ajax({
                type: this.options.method || this.dom.form.method,
                url: this.options.url || this.dom.form.action,
                typeType: this.options.dataType,
                data: formData,
                success: this.options.onSuccess,
                error: this.options.onError
            });
        }
    }
    function getFormData(form) {
        var formElements = getFormElements(form);
        var formData = {};
        for (var i = 0; i < formElements.length; i++) {
            var name = formElements[i].name;
            if (!name) {
                continue;
            }
            var value = getElementValue(formElements[i]);
            if (name && formData[name] !== undefined && Array.isArray(formData[name])) { //push if array
                formData[name].push(value);
            }else if(name && formData[name] !== undefined){ //if same name make into array of values
                formData[name] = [formData[name], value];
            } else { //single value
                formData[name] = value;
            }
        }
        return formData;
    }
    function getElementValue(element) {
        if (element.type === "checkbox") {
            return element.checked;
        } else {
            return element.value;
        }
    }
    function init() {
        this.cacheDom();
        this.attachEvents();
    }
    function getFormElements(form) {
        return form.querySelectorAll("input, select, textarea");
    }

    return {
        create: create
    };

})();
