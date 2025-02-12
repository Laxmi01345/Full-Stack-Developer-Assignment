import nodemailer from 'nodemailer'



const sendMail = async (email, verificationLink) => {

    try {
        
       
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure : true,
            port : 465 ,
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS
            },
        });

        const receiver = {
            from : process.env.EMAIL_USER,
            to : email,
            subject: "Verify Your Email",
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
        };

        await transporter.sendMail(receiver);
        console.log("successfully sends");
    }
    catch(error){
        console.error('Error sending mail ',error)
        throw error;
    }
};

export default sendMail

