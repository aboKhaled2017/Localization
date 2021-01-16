let intialStuff = {
    addNewAcommplishBtn: $('#addNewAccompBtn'),
    togglAccomplishmentBtn: $("#AccomplishmentSection .accomp-records .accomp-record .rightPart .arrowDown"),
    accomplishmentMenu: $('.accomp-menue'),
    handleInitBindings() {
        $(window).on('click', e => {
            this.accomplishmentMenu.hide();
        });
    },
    handleAddNewAcomplishment() {
        this.addNewAcommplishBtn.click(function (e) {
            var $this = $(this);
            var parent = $this.parents(".btn-icon");
            parent.find('.accomp-menue').toggle();
            e.stopPropagation();
        });
    },
    handleToggleAccomplishmentRecord() {
        this.togglAccomplishmentBtn.click(function (e) {
            var $this = $(this);
            var parent = $this.parents(".accomp-record");
            var topPart = parent.find('.desc-short');
            var bottomPart = parent.find('.desc-details');
            parent.prev().toggle();
            topPart.toggle();
            bottomPart.toggle();
            $this.toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        });
    },
    startHandleWork() {
        this.handleInitBindings();
        this.handleAddNewAcomplishment();
        this.handleToggleAccomplishmentRecord();
    }
}

intialStuff.startHandleWork();

let handleOnAddLanguage = {
    modal: $('#profileLanguagePopupModal'),
    modalOverlay: $('#profileLanguagePopupModal .dialog-overlay').eq(0),
    htmlLanguageRecordSection: $('#AccomplishmentSection .accomp-record[data-title=language]'),
    htmlLanguageItemsSection: $('#AccomplishmentSection .accomp-record[data-title=language] .desc-details ul'),
    form: $('#profileLanguagePopupModalForm').get(0),
    saveBtn: $('#languageSaveBtn'),
    nameInp: $('input[name=languageName]').eq(0),
    proficiencySelectInp: $('select[name=languageProficiency]').eq(0),
    languageNameErrorInp: $('#languageNameError'),
    languageProficiencyErrorInp: $('#languageProficiencyError'),
    cleanErrorsOnTyping() {
        this.nameInp.keydown(e => {
            if (!this.languageNameErrorInp.hasClass('d-none'))
                this.languageNameErrorInp.addClass('d-none');
        })
    },
    validateForm(onValid) {
        let isValid = true;
        let nameVal = this.nameInp.val();
        if (!(nameVal || nameVal.trim())) {
            isValid = false;
            this.languageNameErrorInp.toggleClass('d-none')
                .find('span')
                .text("Please select the language (Required)");
        }
        if (isValid) {
            onValid({
                name: nameVal.trim(),
                proficiency:this.proficiencySelectInp.val()
            });
        }
    },
    submitDataToServer(data) {
        this.modalOverlay.toggleClass('d-none');
        setTimeout(() => {
            alert('new language added')
            this.bindNewSectionToAccomplishmentDiv(data);
            this.modalOverlay.toggleClass('d-none');
            this.modal.modal('hide');
        }, 2000)
    },
    bindNewSectionToAccomplishmentDiv(data) {
        const li = $(`<li data-record="${data.name}">
                        <hr class="w-100" />
                        <h6 class="sub-item-title mt-1 mb-0">${data.name}</h6>
                        <p>${data.proficiency}</p>
                        
                      </li>`);
        this.htmlLanguageItemsSection.append(li);
    },
    handleOnClickSave() {
        this.saveBtn.click(e => {
            this.validateForm(data => {
                this.form.reset();            
                this.submitDataToServer(data);
            });
        });
    },
    startHandlingWork() {
        this.cleanErrorsOnTyping();
        this.handleOnClickSave();
    }
}

let handleOnAddProject = {
    modal: $('#profileProjectPopupModal'),
    modalOverlay: $('#profileProjectPopupModal .dialog-overlay').eq(0),
    htmlLanguageRecordSection: $('#AccomplishmentSection .accomp-record[data-title=language]'),
    htmlLanguageItemsSection: $('#AccomplishmentSection .accomp-record[data-title=language] .desc-details ul'),
    form: $('#profileProjectPopupModalForm').get(0),
    saveBtn: $('#projectSaveBtn'),
    nameInp: $('input[name=projectName]').eq(0),
    proficiencySelectInp: $('select[name=languageProficiency]').eq(0),
    languageNameErrorInp: $('#languageNameError'),
    languageProficiencyErrorInp: $('#languageProficiencyError'),
    cleanErrorsOnTyping() {
        this.nameInp.keydown(e => {
            if (!this.languageNameErrorInp.hasClass('d-none'))
                this.languageNameErrorInp.addClass('d-none');
        })
    },
    validateForm(onValid) {
        let isValid = true;
        let nameVal = this.nameInp.val();
        if (!(nameVal || nameVal.trim())) {
            isValid = false;
            this.languageNameErrorInp.toggleClass('d-none')
                .find('span')
                .text("Please select the language (Required)");
        }
        if (isValid) {
            onValid({
                name: nameVal.trim(),
                proficiency: this.proficiencySelectInp.val()
            });
        }
    },
    submitDataToServer(data) {
        this.modalOverlay.toggleClass('d-none');
        setTimeout(() => {
            alert('new language added')
            this.bindNewSectionToAccomplishmentDiv(data);
            this.modalOverlay.toggleClass('d-none');
            this.modal.modal('hide');
        }, 2000)
    },
    bindNewSectionToAccomplishmentDiv(data) {
        const li = $(`<li data-record="${data.name}">
                        <hr class="w-100" />
                        <h6 class="sub-item-title mt-1 mb-0">${data.name}</h6>
                        <p>${data.proficiency}</p>
                        
                      </li>`);
        this.htmlLanguageItemsSection.append(li);
    },
    handleOnClickSave() {
        this.saveBtn.click(e => {
            this.validateForm(data => {
                this.form.reset();
                this.submitDataToServer(data);
            });
        });
    },
    startHandlingWork() {
        this.cleanErrorsOnTyping();
        this.handleOnClickSave();
    }
}

let handleAcommplishmentFunctionality = {
    startHandle() {
        handleOnAddLanguage.startHandlingWork();
        handleOnAddProject.startHandlingWork();
    }
}

handleAcommplishmentFunctionality.startHandle();


