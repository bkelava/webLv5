class Fighter
{
    constructor(form)
    {
        this.form=form;
    }

    initialize()
    {
        this.submit(this.form);
    }

    submit(s) 
    {
        const form = document.querySelector(s);

        form.addEventListener("submit",function (e) {
            e.preventDefault();

            /**
             * https://developer.mozilla.org/en-US/docs/Web/API/FormData
             * @type {FormData}
             */
            const data = new FormData(this);
            fetch('controller/db/Insert.php', {
                method: 'post',
                body: data
            })
                .then(response => response.text())
                .then(response => {
                    /**
                     * If 200, reload the page
                     */
                    location.replace("index.php");
                })
                .catch(error => alert(error));
        });
    }
}

const data = { form: "form",}

const fighter = new Fighter(data.form);
fighter.initialize();

