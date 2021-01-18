let Binder = {
    _handleCheckBoxIfItWas(el, objModel,prop) {
        let type = el.getAttribute('type');
        if (type = "checkbox") {
            el.onchange = e => {
                objModel[prop] = e.target.checked;
            }
            return true;
        }
    },
    _bindValToModel(el, nodeName, val) {
        var type = el.getAttribute('type');
        if (type == 'checkbox') {
            el.checked = val;
        }
        switch (nodeName) {
            case 'INPUT': el.value = val; break;
            case 'SELECT': el.value = val; break;
            case 'TEXTAREA': el.value = val; break;
            default: el.innerText = val;
        }
    },
     createBind($selector, objModel) {
        let $this = this;
        for (let prop in objModel) {
            if (objModel.hasOwnProperty(prop)) {
                let el = $selector.querySelector(`[bind-to=${prop}]`);
                if (!el) return;
                let nodeName = el.nodeName;
                $this._bindValToModel(el, nodeName, objModel[prop]);
                Object.defineProperty(objModel, prop, {
                    get() {
                        switch (nodeName) {
                            case 'INPUT': return el.value;
                            case 'SELECT': return el.value;
                            case 'TEXTAREA': return el.value;
                            default: return el.innerText;
                        }
                    },
                    set(val) {
                        $this._bindValToModel(el, nodeName, val);
                    }
                });
                if (nodeName == "INPUT" || nodeName == "TEXTAREA" || nodeName == "SELECT") {
                    if ($this._handleCheckBoxIfItWas(el, objModel,prop)) continue;
                    el.onchange = function (e) {
                        objModel[prop] = e.target.value;
                    }
                }
            }
        }
    }
} 