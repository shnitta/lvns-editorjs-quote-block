class LvnsQuoteBlock {
    static get toolbox() {
        return {
            title: 'QuoteBlock',
            icon: '<img src="assets/icon.svg" width="17" height="15">'
        };
    } 

    constructor({data}){
        this.data = data;
        this.wrapper = undefined;
    }

    render(){
        this.wrapper = document.createElement('div');
        const input = document.createElement('input');
        
        this.wrapper.classList.add('quote_block');

        if(this.data && this.data.value){
            this._createContent(this.data.value);
            return this.wrapper;
        }

        this.wrapper.appendChild(input);

        input.placeholder = 'Quoted text...';
        input.value = this.data && this.data.value ? this.data.value : '';
        
        return this.wrapper;
	}

    _createContent(text){

        const quote_block = document.createElement('div');

        quote_block.contentEditable = true;
        quote_block.innerHTML = text || '';

        this.wrapper.innerHTML = '';
        this.wrapper.appendChild(label);

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