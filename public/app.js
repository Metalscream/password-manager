class Modal{
    constructor(){
        this.service = hb.Find("#service")
        this.mail = hb.Find("#mail")
        this.username = hb.Find("#username")
        this.password = hb.Find("#password")
    }

    clearFields(){
        this.service.value = "" && this.service.labels[0].RemoveClassname("active")
        this.mail.value = "" && this.mail.labels[0].RemoveClassname("active")
        this.username.value = "" && this.username.labels[0].RemoveClassname("active")
        this.password.value = "" && this.password.labels[0].RemoveClassname("active")
    }

    validateFields(){
        if(
            this.isServiceFieldEmpty() ||
            this.isMailFieldEmpty() ||
            this.isUsernameFieldEmpty() ||
            this.isPasswordFieldEmpty()
        )
        {
            return false
        }
        return true
    }

    isServiceFieldEmpty(){
        return this.service.value === ""
    }

    isMailFieldEmpty(){
        return this.mail.value === ""
    }

    isUsernameFieldEmpty(){
        return this.username.value === ""
    }

    isPasswordFieldEmpty(){
        return this.password.value === ""
    }
}

class App{
    constructor(){
        this.modal = new Modal()
        this.body = document.body
        this.container = null
        this._init()
        this.createItem({
            service: "Reddit",
            mail: "soap@mail.ru",
            username: "Metalscream",
            password: "qwerty"
        })
    }
    
    _init(){
        M.AutoInit();

        hb.Find(".addAService").AddEventListener("click", (e)=>{
            if(this.modal.validateFields()){
                this.createItem({
                    service: null,
                    mail: null,
                    username: null,
                    password: null
                })
                this.modal.clearFields()
            }
            else
            {
                M.toast({html: 'Please fill every field'})
                e.preventDefault()
            }
        })

        hb.Find(".cancelAdding").AddEventListener("click", ()=>{
            this.modal.clearFields()
        })

        hb.Find(".modal-trigger").AddEventListener("click", ()=>{
            M.updateTextFields()
        })

        document.addEventListener("keyup", e => {
            if(e.keyCode === 13){
                if(this.modal.validateFields()){
                    this.createItem({
                        service: null,
                        mail: null,
                        username: null,
                        password: null
                    })
                    this.modal.clearFields()
                    M.Modal.init(document.querySelectorAll('.modal'));
                }
                else
                {
                    M.toast({html: 'Please fill every field'})
                    e.preventDefault()
                }
            }
        })
    }

    createItem(options){
        hb.Find(".non-favorite").AppendChilds(
            hb.Create("li").AddClassName("collection-item avatar").AppendChilds(
                hb.Create("img").AddClassName("circle").SetSrc("./icons/reddit.svg"),
                hb.Create("div").AddClassName("row").AppendChilds(
                    hb.Create("span").AddClassName("col m3 copypaste").Fill(options.service || hb.Find("#service").value).AddEventListener("click", this.onItemClick).AppendChilds(
                        hb.Create("i").AddClassName("material-icons editButton").Fill("&nbsp edit")
                        ),
                    hb.Create("span").AddClassName("col m3 copypaste").Fill(options.mail || hb.Find("#mail").value).AddEventListener("click", this.onItemClick).AppendChilds(
                        hb.Create("i").AddClassName("material-icons editButton").Fill("&nbsp edit")
                        ),
                    hb.Create("span").AddClassName("col m3 copypaste").Fill(options.username || hb.Find("#username").value).AddEventListener("click", this.onItemClick).AppendChilds(
                        hb.Create("i").AddClassName("material-icons &nbsp editButton").Fill("&nbsp edit")
                        ),
                    hb.Create("span").AddClassName("col m3 copypaste").Fill(options.password || hb.Find("#password").value).AddEventListener("click", this.onItemClick).AppendChilds
                    (hb.Create("i").AddClassName("material-icons editButton").Fill("&nbsp edit")
                    )
                ),
                hb.Create("div").AddClassName("secondary-content").AppendChilds(
                    hb.Create("i").AddClassName("material-icons star").Fill("star_border").AddEventListener("click", (e)=>{
                        this.addingFavorite(e)
                    }),
                    hb.Create("i").AddClassName("material-icons").Fill("delete").AddEventListener("click", (e)=>{
                        e.target.parentElement.parentElement.remove()
                    })
                )
            )
        )
        hb.Find(".non-favorite").RemoveClassName("hide")
    }

    addingFavorite(e){
        let element = e.target.parentElement.parentElement
        if(e.target.innerText === "star_border"){
            e.target.Fill("grade")
            e.target.AddClassName("active")
            hb.Find(".favorite").AppendChilds(element)
            this.isNonFavoriteEmpty() ? hb.Find(".non-favorite").AddClassName("hide") : console.log("non-favorite is not empty")
        }
        else
        {
            e.target.Fill("star_border")
            e.target.RemoveClassName("active")
            hb.Find(".non-favorite").AppendChilds(element)
            hb.Find(".non-favorite").RemoveClassName("hide")
        }
    }
    
    isNonFavoriteEmpty(){
        return hb.Find(".non-favorite").childElementCount === 0
    }

    onItemClick(e){
        navigator.clipboard.writeText(e.target.innerText)
        M.toast({html: 'Copied'})
    }
}

new App()


