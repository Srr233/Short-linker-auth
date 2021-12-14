import mailjet from 'node-mailjet';
const connecter = mailjet.connect('35d25ca8d9eccaa792ff2416b505f14d', '55819a50412dfe96008f2d7f3fb2d1c4')

interface Options {
    Subject: string,
    TextPart: string,
    HTMLPart: string,
    CustomID: string
}
const sendMessageToEmail = (to: string, options: Options) => {
    const post = connecter.post('send', {version: 'v3.1'});
    post.request({
        "Messages": [
            {
                From: {
                    Email: "sr233@yandex.ru",
                    Name: "Share-linker"
                },
                To: [
                    {
                        Email: to,
                        Name: 'Siarhei'
                    }
                ],
                Subject: options.Subject,
                TextPart: options.TextPart,
                HTMLPart: options.HTMLPart,
                CustomID: options.CustomID
            }
        ]
    })
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
    console.log(err)
    })
}

export {
    sendMessageToEmail
}