class LvnsQuoteBlock {
    static get toolbox() {
        return {
            title: '引用ブロック',
            icon: '<img src="assets/icon.svg" width="17" height="15">'
        };
    } 

    constructor({data}){
        this.data = data;
        this.wrapper = undefined;
    }

    render(){
        this.wrapper = document.createElement('div');
        this.wrapper.innerHTML = '';

        const block = document.createElement('div');
        block.classList.add('quote_block');
        block.placeholder = 'Quoted Text...';
        block.contentEditable = true;
        block.innerHTML = this.data.value || '';

        this.wrapper.appendChild(block);

        return this.wrapper;
	}
      
	save(blockContent){
        const input = blockContent.querySelector('[contenteditable]');

        return {
            value: input.innerHTML || ''
        }
	}

    validate(savedData){
        if (!savedData.value.trim()){
          return false;
        }
    
        return true;
      }
}
class LvnsButton {
    static get toolbox() {
        return {
            title: 'ボタン',
            icon: '<img src="assets/button.svg" width="17" height="15">'
        };
    } 

    constructor({data}){
        this.data = data;
        this.wrapper = undefined;
        this.data = {
            label: data.label || '',
            link: data.link || '',
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
        const label = document.createElement('input');
        label.placeholder = 'ラベル';
        label.contentEditable = true;
        label.value = this.data.label || '';
        label.addEventListener('change', (event) => {
            this.data.label  = event.target.value;
            if (this.data && this.data.label && this.data.link){
                this._renderButton(this.data.label, this.data.link);
            }
        });
      
        this.wrapper.appendChild(label);

        const link = document.createElement('input');
        link.placeholder = 'リンク先URL...';
        link.contentEditable = true;
        link.value = this.data.link || '';
        link.addEventListener('change', (event) => {
            this.data.link  = event.target.value;
            if (this.data && this.data.label && this.data.link){
                this._renderButton(this.data.label, this.data.link);
            }
        });
        this.wrapper.appendChild(link);

    }

    _renderButton(label, target){
       
        this.wrapper.innerHTML = '';
        const block = document.createElement('button');

        block.classList.add('btn');
        block.classList.add('-green');
        block.classList.add('-round');
        block.classList.add('-article');
        block.classList.add('-center');

        block.innerHTML = label || '';
        block.onclick = function() {
            window.open(target);
          };

        this.wrapper.appendChild(block);
    }
      
	save(blockContent){
        return Object.assign(this.data, {
            label: this.data.label || '',
            link: this.data.link || ''
        });
	}

    validate(savedData){
        if (!savedData.label.trim()){
          return false;
        }
        if (!savedData.link.trim()){
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
      }
}