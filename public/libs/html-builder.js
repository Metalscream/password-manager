;(function(){

    class HtmlBuilder 
    {
        constructor()
        {
            this.___htmlUpdate();
            this.document = window.document;
            this.body = window.document.body;
        }

        ___htmlUpdate()
        {
            HTMLElement.prototype.AddClassName = function(classes)
            {
                let arr = classes.trim().split(" ");

                for (let i = 0; i < arr.length; i++)
                {
                    this.classList.add(arr[i]);
                }

                return this;
            }

            HTMLElement.prototype.RemoveClassName = function(className)
            {
                this.classList.remove(className);
                return this;
            }

            HTMLElement.prototype.AddId = function(id)
            {
                this.id = id;
                return this;
            }

            HTMLElement.prototype.AppendChilds = function(...childs)
            {
                for (let i = 0; i < childs.length; i++)
                {
                    if (!(childs[i] instanceof Node))
                    {
                        throw new Error(`${childs[i]} is not a HTML element.`)
                    }

                    else
                    {
                        this.appendChild(childs[i]);
                    }
                }

                return this;
            }

            HTMLElement.prototype.Fill = function(data)
            {
                this.innerHTML = data;
                return this;
            }

            HTMLElement.prototype.AddEventListener = function(eventType, callback)
            {
                this.addEventListener(eventType, e => {
                    callback(e);
                });
                return this;
            }

            HTMLElement.prototype.SetProps = function(...props)
            {
                //TODO
            }

            HTMLImageElement.prototype.SetSrc = function(url)
            {
                this.setAttribute('src', url);
                return this;
            }

            HTMLImageElement.prototype.SetSize = function(w, h)
            {
                if (w) this.width = w;
                if (h) this.height = h;
                return this;
            }

            HTMLImageElement.prototype.SetAlt = function (data)
            {
                this.setAttribute('alt', data);
                return this;
            }

            HTMLElement.prototype.SetAttribute = function (attr_name, attr_data)
            {
                this.setAttribute(attr_name, attr_data);
                return this;
            }

            HTMLInputElement.prototype.SetValue = function (attr_data)
            {
                this.value = attr_data;
                return this;
            }

            HTMLTextAreaElement.prototype.SetValue = function (attr_data)
            {
                this.value = attr_data;
                return this;
            }

            HTMLElement.prototype.SetDisable = function (attr_bool)
            {
                this.disabled = attr_bool;
                return this;
            }
        }

        Create(element)
        {
            return this.document.createElement(element)
        }

        Find(selector)
        {
            return this.document.querySelectorAll(selector).length > 1 ?  this.document.querySelectorAll(selector) : this.document.querySelectorAll(selector)[0];
        }

    }

    window.hb = new HtmlBuilder();

}());