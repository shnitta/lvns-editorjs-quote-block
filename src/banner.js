class LvnsBanner {
    static get toolbox() {
        return {
            title: 'バナー画像',
            icon: '<img src="assets/banner.svg" width="17" height="15">'
        };
    } 

    constructor({data}){
        this.data = data;
        this.wrapper = undefined;
        this.data = {
            src: data.src || '',
            alt: data.alt || '',
            padding: data.padding || false,
        };
        this.settings = [
            {
                name: 'edit',
                icon: '<img src="assets/edit.svg" width="17" height="15">'
            },
        ];
    }

    render(){
        this.wrapper = document.createElement('div');
        this.wrapper.innerHTML = '';

        if (this.data && this.data.label && this.data.link){
            this._renderButton(this.data.label, this.data.link);
            return this.wrapper;
        }
        this._renderForm();
        return this.wrapper;

	}

    _renderForm(){
        //src
        const input_src = document.createElement('input');
        input_src.classList.add('ce-paragraph');
        input_src.classList.add('cdx-block');
        input_src.placeholder = '画像URL';
        input_src.contentEditable = true;
        input_src.value = this.data.src || '';
        input_src.addEventListener('change', (event) => {
            this.data.src  = event.target.value;
            if (this.data && this.data.src && this.data.alt){
                this._renderItem(this.data.src, this.data.alt, this.data.padding);
            }
        });
      
        this.wrapper.appendChild(input_src);

        //alt
        const input_alt = document.createElement('input');
        input_alt.classList.add('ce-paragraph');
        input_alt.classList.add('cdx-block');
        input_alt.placeholder = 'alt';
        input_alt.contentEditable = true;
        input_alt.value = this.data.alt || '';
        input_alt.addEventListener('change', (event) => {
            this.data.alt  = event.target.value;
            if (this.data && this.data.src && this.data.alt){
                this._renderItem(this.data.src, this.data.alt, this.data.padding);
            }
        });
        this.wrapper.appendChild(input_alt);

        //padding
        const padding_div = document.createElement('div');
        const padding_label = document.createElement('label');
        const padding_check = document.createElement('input');
        const padding_span = document.createElement('span');

        padding_div.classList.add('form_input');
        padding_div.classList.add('form_checks');

        padding_div.appendChild(padding_label);
        padding_label.appendChild(padding_check);
        padding_label.appendChild(padding_span);
        padding_span.appendChild(document.createTextNode('Enable Padding'));

        padding_check.setAttribute('type','checkbox');
        padding_check.classList.add('checkbox');
        padding_span.classList.add('form_input_view');
        if(this.data.padding === true){
            padding_check.setAttribute('checked','checked');
        }
        padding_check.addEventListener('click', (event) => {
            this.data.padding  = !this.data.padding;
            if(this.data.padding === true){
                padding_check.setAttribute('checked','checked');
            }else{
                padding_check.removeAttribute('checked');
            }

        });
        this.wrapper.appendChild(padding_div);

        //確定ボタン
        // const submit_div = document.createElement('div');
        const btn_submit = document.createElement('div');
        btn_submit.classList.add('btn');
        btn_submit.innerHTML = 'Save';
        btn_submit.addEventListener('click', (event) => {
            this._clickSettingButton('confirm');
        });
        this.wrapper.appendChild(btn_submit);
        // submit_div.appendChild(btn_submit);
    }

    _renderItem(src, alt, padding){

        if (!this.data || !this.data.src){
            this._renderForm();
            return;
        }
       
        this.wrapper.innerHTML = '';
        const block = document.createElement('img');

        block.classList.add('banner_img');
        if(padding === true){
            block.classList.add('-padding');
        }
        block.src = src;
        block.alt = alt;
        this.wrapper.appendChild(block);

        
    }
      
	save(blockContent){
        return Object.assign(this.data, {
            src: this.data.src || '',
            alt: this.data.alt || '',
            padding: this.data.padding || false
        });
	}

    validate(savedData){
        if (!savedData.src.trim()){
          return false;
        }
    
        return true;
    }

    renderSettings(){
        const wrapper = document.createElement('div');

        this.settings.forEach( tune => {
            let button = document.createElement('div');

            button.classList.add('cdx-settings-button');
            button.innerHTML = tune.icon;
            wrapper.appendChild(button);

            button.addEventListener('click', () => {
                this._clickSettingButton(tune.name);
                button.classList.toggle('cdx-settings-button--active');
            });
        });

        return wrapper;
    }

    _clickSettingButton(tune) {
        if(tune === 'edit'){
            this.wrapper.innerHTML = '';
            this._renderForm();
        }
        if(tune === 'confirm'){
            this.wrapper.innerHTML = '';
            this._renderItem(this.data.src, this.data.alt, this.data.padding);
        }
      }
}