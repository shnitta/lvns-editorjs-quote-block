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