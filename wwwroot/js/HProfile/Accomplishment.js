const constants = {
    monts : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
}

const intialStuff = {
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

const common = {
    mainSection: $('#AccomplishmentSection'),
    recordsSection: $('#AccomplishmentSection .accomp-records'),
    createNewSection(title,type,fsItemName) {
        let cloneSection = this.recordsSection.find('.accomp-record')
            .eq(0).removeClass('d-none').clone(true);
        cloneSection.find('.accomp-record-title').text(title);
        cloneSection.find('.number').text("0");
        cloneSection.find('.text-nowrap').empty().append(`<span>${fsItemName}</span>`);
        cloneSection.attr('data-title', type).find('.desc-details ul').empty();
        var container = $();
        const hr = $(`<div class="w-100">
                          <hr class="accomp-hr" />
                      </div>`);

        var count = this.recordsSection.children('.accomp-record').length;
        if (count > 0) {
            container = container.add(hr);
        }
        container = container.add(`<hr class="full-hr" />`);
        container = container.add(cloneSection);
        this.recordsSection.append(container);
        return cloneSection;
    },
    isExistsSectionOfType(type) {
        var sec = this.recordsSection.find(`.accomp-record[data-title=${type}]`);
        return sec.length > 0;
    }
}

const handleOnAddLanguage = {
    modal: $('#profileLanguagePopupModal'),
    modalOverlay: $('#profileLanguagePopupModal .dialog-overlay').eq(0),
    htmlRecordSection: $('#AccomplishmentSection .accomp-record[data-title=language]'),
    htmlItemsSection: $('#AccomplishmentSection .accomp-record[data-title=language] .desc-details ul'),
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
        let isNameAdded = false;
        if (!common.isExistsSectionOfType('language')) {           
            this.htmlRecordSection = common.createNewSection('Languages', 'language', data.name);
            this.htmlItemsSection = this.htmlRecordSection.find('.desc-details ul');
            isNameAdded = true;
        }
        const li = $(`<li data-record="${data.name}">
                        <hr class="w-100" />
                        <h6 class="sub-item-title mt-1 mb-0">${data.name}</h6>
                        <p>${data.proficiency}</p>
                        
                      </li>`);
        const numberEl = this.htmlRecordSection.find('.number');
        let num = parseInt(numberEl.text());
        numberEl.text(num + 1);
   
        if (!isNameAdded) {
            const nameEl = this.htmlRecordSection.find('.text-nowrap');
            nameEl.append(` <span><i class="fa fa-circle fa-xs text-dark"></i></span> <span>${data.name}</span> `);
        }
        this.htmlItemsSection.append(li);
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

const handleOnAddProject = {
    modal: $('#profileProjectPopupModal'),
    modalOverlay: $('#profileProjectPopupModal .dialog-overlay').eq(0),
    htmlRecordSection: $('#AccomplishmentSection .accomp-record[data-title=project]'),
    htmlItemsSection: $('#AccomplishmentSection .accomp-record[data-title=project] .desc-details ul'),
    form: $('#profileProjectPopupModalForm').get(0),
    saveBtn: $('#projectSaveBtn'),
    nameInp: $('input[name=projectName]').eq(0),
    NameErrorInp: $('#projectNameError'),
    isCurrentlyWorkOnInp: $('#isCurrentlyWorkOnProject'),
    associatedWithSelectInp: $('select[name=projectAssociatedWith]').eq(0),
    associatedWithSelectError: $('#projectAssociatedWithError'),
    urlInp: $('input[name=projectUrl]').eq(0),
    urlError: $('#projectUrlError'),
    descInp: $('textarea[name=projectDesc]').eq(0),
    descError: $('#projectDescError'),
    startMonthSelectInp: $('select[name=projectStartMonth]'),
    startYearSelectInp: $('select[name=projectStartYear]'),
    endMonthSelectInp: $('select[name=projectEndMonth]'),
    endYearSelectInp: $('select[name=projectEndYear]'),
    dateError: $('#projectDateError'),
    projectEndDateLabel: $('#projectEndDateLabel'),
    resetForm() {
        this.form.reset();
        this.endMonthSelectInp.show();
        this.endYearSelectInp.show();
        this.projectEndDateLabel.show();
    },
    cleanErrorsOnTyping() {
        this.nameInp.keydown(e => {
            if (!this.NameErrorInp.hasClass('d-none'))
                this.NameErrorInp.addClass('d-none');
        });
        $('select[name=projectStartMonth],select[name=projectStartYear],select[name=projectEndMonth],select[name=projectEndYear]').change(e => {
            if (!this.dateError.hasClass('d-none'))
                this.dateError.addClass('d-none');
        });
    },
    hideEndDateOnCheckboxEnabled() {
        this.isCurrentlyWorkOnInp.change(e => {
            let isChecked = this.isCurrentlyWorkOnInp.is(':checked');
            if (isChecked) {
                this.endMonthSelectInp.hide();
                this.endYearSelectInp.hide();
                this.projectEndDateLabel.hide();
            }
            else {
                this.endMonthSelectInp.show();
                this.endYearSelectInp.show();
                this.projectEndDateLabel.show();
            }
        });
    },
    validateForm(onValid) {
        let isValid = true;
        let nameVal = this.nameInp.val();
        let startMonth = this.startMonthSelectInp.val();
        let startYear = this.startYearSelectInp.val();
        let endMonth = this.endMonthSelectInp.val();
        let endYear = this.endYearSelectInp.val();
        let isCurrentlyWorkOn = this.isCurrentlyWorkOnInp.is(':checked');
        if (!(nameVal || nameVal.trim())) {
            isValid = false;
            this.NameErrorInp.removeClass('d-none')
                .find('span')
                .text("Please enter the project name (Required)");
        }

        if (Boolean(!isCurrentlyWorkOn && !(endYear && endYear.trim()))) {
            isValid = false;
            this.dateError.removeClass('d-none')
                .find('span')
                .text("Enter End Year (Required)");
        }
        if (Boolean(!isCurrentlyWorkOn && !(endMonth && endMonth.trim()))) {
            isValid = false;
            this.dateError.removeClass('d-none')
                .find('span')
                .text("Enter End Month (Required)");
        }

        if (Boolean(!(startYear || startYear.trim()))) {
            isValid = false;
            this.dateError.removeClass('d-none')
                .find('span')
                .text("Enter Start Year (Required)");
        }
        if (Boolean(!(startMonth || startMonth.trim()))) {
            isValid = false;
            this.dateError.removeClass('d-none')
                .find('span')
                .text("Enter Start Month (Required)");
        }
        if (isValid) {
            onValid({
                name: nameVal.trim(),
                isCurrentlyWorkOn: isCurrentlyWorkOn,
                associatedWith: this.associatedWithSelectInp.val(),
                url: this.urlInp.val(),
                desc: this.descInp.val(),
                startMonth,
                startYear,
                endMonth,
                endYear
            });
        }
    },
    submitDataToServer(data) {
        alert(JSON.stringify(data))
        this.modalOverlay.toggleClass('d-none');
        setTimeout(() => {
            this.bindNewSectionToAccomplishmentDiv(data);
            this.modalOverlay.toggleClass('d-none');
            this.modal.modal('hide');
        }, 2000)
    },
    bindNewSectionToAccomplishmentDiv(data) {
        let isNameAdded = false;
        if (!common.isExistsSectionOfType('project')) {
            this.htmlRecordSection = common.createNewSection('Projects', 'project', data.name);
            this.htmlItemsSection = this.htmlRecordSection.find('.desc-details ul');
            isNameAdded = true;
        }
        const li = $(`<li data-record="${data.name}">
                        <hr class="w-100" />
                        <h6 class="sub-item-title mt-1 mb-0">${data.name}</h6>
                      </li>`);
        var dateEl = $(`<p><span>${constants.monts[data.startMonth]} ${data.startYear}</span> </p>`);
        if (Boolean(data.isCurrentlyWorkOn)) {
            dateEl.append(`-Present`);
        }
        else {
            dateEl.append(`${constants.monts[data.endMonth]} ${data.endYear}`);
        }
        li.append(dateEl);
        if (data.associatedWith) {
            li.append(`<p>${data.associatedWith}</p>`);
        }
        if (data.desc) {
            li.append(`<p>${data.desc}</p>`);
        }
        if (data.url) {
            li.append(`<a target="_blank" class="btn-link btn-sm addCreatorBtn text-primary" href="${data.url}">see the project</a>`);
        }
    
        const numberEl = this.htmlRecordSection.find('.number');
        let num = parseInt(numberEl.text());
        numberEl.text(num + 1);
        if (!isNameAdded) {
            const nameEl = this.htmlRecordSection.find('.text-nowrap');
            nameEl.append(` <span><i class="fa fa-circle fa-xs text-dark"></i></span> <span>${data.name}</span> `);
        }
        this.htmlItemsSection.append(li);
    },
    handleOnClickSave() {
        this.saveBtn.click(e => {
            this.validateForm(data => {
                this.resetForm();
                this.submitDataToServer(data);
            });
        });
    },
    startHandlingWork() {
        this.cleanErrorsOnTyping();
        this.hideEndDateOnCheckboxEnabled();
        this.handleOnClickSave();
    }
}

const handleOnAddCourse = {
    modal: $('#profileCoursePopupModal'),
    modalOverlay: $('#profileCoursePopupModal .dialog-overlay').eq(0),
    htmlRecordSection: $('#AccomplishmentSection .accomp-record[data-title=course]'),
    htmlItemsSection: $('#AccomplishmentSection .accomp-record[data-title=course] .desc-details ul'),
    form: $('#profileCoursePopupModalForm').get(0),
    saveBtn: $('#courseSaveBtn'),
    nameInp: $('input[name=courseName]').eq(0),
    nameErrorInp: $('#courseNameError'),
    proficiencySelectInp: $('select[name=courseProficiency]').eq(0),
    ProficiencyErrorInp: $('#courseProficiencyError'),
    numberInp: $('input[name=courseNumber]').eq(0),
    numberErrorInp: $('#courseNumberError'),
    cleanErrorsOnTyping() {
        this.nameInp.keydown(e => {
            if (!this.nameErrorInp.hasClass('d-none'))
                this.nameErrorInp.addClass('d-none');
        });
        this.numberInp.keydown(e => {
            if (!this.numberErrorInp.hasClass('d-none'))
                this.numberErrorInp.addClass('d-none');
        });
    },
    validateForm(onValid) {
        let isValid = true;
        let nameVal = this.nameInp.val();
        if (!(nameVal || nameVal.trim())) {
            isValid = false;
            this.nameErrorInp.toggleClass('d-none')
                .find('span')
                .text("Please Enter The course Name (Required)");
        }
        if (isValid) {
            onValid({
                name: nameVal.trim(),
                number: this.numberInp.val(),
                proficiency: this.proficiencySelectInp.val()
            });
        }
    },
    submitDataToServer(data,onSuccess) {
        this.modalOverlay.toggleClass('d-none');
        setTimeout(() => {
            onSuccess();         
            this.modalOverlay.toggleClass('d-none');
            this.modal.modal('hide');
        }, 1000)
    },
    bindNewSectionToAccomplishmentDiv(data) {
        let isNameAdded = false;
        if (!common.isExistsSectionOfType('course')) {
            this.htmlRecordSection = common.createNewSection('Courses', 'course', data.name);
            this.htmlItemsSection = this.htmlRecordSection.find('.desc-details ul');
            isNameAdded = true;
        }
        const li = $(`<li data-record="${data.name}">
                        <hr class="w-100" />
                        <h6 class="sub-item-title mt-1 mb-0">${data.name}</h6>
                        <p>${data.proficiency}</p>                        
                      </li>`);
        const numberEl = this.htmlRecordSection.find('.number');
        let num = parseInt(numberEl.text());
        numberEl.text(num + 1);
        const nameEl = this.htmlRecordSection.find('.text-nowrap');
        if (!isNameAdded)
        nameEl.append(` <span><i class="fa fa-circle fa-xs text-dark"></i></span> <span>${data.name}</span> `);
        this.htmlItemsSection.append(li);
    },
    handleOnClickSave() {
        this.saveBtn.click(e => {
            this.validateForm(data => {
                this.form.reset();
                this.submitDataToServer(data, () => {
                    this.bindNewSectionToAccomplishmentDiv(data);
                });
            });
        });
    },
    startHandlingWork() {
        this.cleanErrorsOnTyping();
        this.handleOnClickSave();
    }
}

const handleAcommplishmentFunctionality = {
    startHandle() {
        handleOnAddLanguage.startHandlingWork();
        handleOnAddProject.startHandlingWork();
        handleOnAddCourse.startHandlingWork();
    }
}

intialStuff.startHandleWork();
handleAcommplishmentFunctionality.startHandle();



