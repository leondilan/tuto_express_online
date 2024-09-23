const yup = require('yup')
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "goodformateur237@gmail.com",
    pass: "uhwwoyyhbogyzysf",
  },
});

let contactSchema = yup.object({
  nom: yup.string().trim().required('Le nom est requis'),
  email: yup.string().trim().email('L\'email est invalide').required('L\'email est requis'),
  numero: yup.string().trim().required('Le numéro est requis'),
  description: yup.string().trim().required('La description est requise')
                            .min(10, 'La description doit contenir au moins 10 caractères')
});

const produits = [
    {
      id: 1,
      image: "/images/im10.jpg",
      titre: "Premier Titre",
      description: "Cette première description offre un aperçu détaillé de l'objet en question. Elle souligne ses caractéristiques uniques, comme sa forme, sa couleur et son utilité dans diverses situations. En outre, elle décrit comment cet objet peut être utilisé pour résoudre des problèmes spécifiques ou améliorer une tâche quotidienne. Avec une attention particulière portée aux détails, cette description vous permet d'apprécier la valeur intrinsèque de l'objet. Ce dernier peut être utilisé aussi bien par des professionnels que par des amateurs, apportant à chacun des avantages inestimables dans leur quotidien."
    },
    {
      id: 2,
      image: "/images/im9.jpg",
      titre: "Deuxième Titre",
      description: "Le deuxième objet de cette collection se distingue par sa conception innovante et son design moderne. Avec une apparence élégante et des fonctionnalités bien pensées, cet objet attire l'attention de ceux qui recherchent la performance alliée à l'esthétique. Il est conçu pour être pratique, léger, et facile à utiliser, tout en offrant une durabilité exceptionnelle. Que vous l'utilisiez dans un cadre professionnel ou personnel, il est conçu pour vous fournir une expérience fluide. Les matériaux de qualité supérieure utilisés dans sa fabrication garantissent une longévité accrue."
    },
    {
      id: 3,
      image: "/images/im8.jpg",
      titre: "Troisième Titre",
      description: "La troisième description met en avant un objet qui se distingue par son utilité polyvalente. Grâce à sa conception ergonomique, il s'adapte à diverses situations. Que vous soyez à la maison ou au bureau, cet objet vous accompagnera au quotidien avec efficacité. Sa fabrication robuste et son design intuitif en font un choix de premier ordre pour ceux qui recherchent une solution fiable. Il est non seulement fonctionnel mais également esthétiquement plaisant, ce qui le rend adapté à tous les environnements. En somme, c'est un objet incontournable pour tous."
    },
    {
      id: 4,
      image: "/images/im7.jpg",
      titre: "Quatrième Titre",
      description: "Le dernier objet de cette série se démarque par son incroyable adaptabilité. Il a été conçu avec des matériaux de pointe, ce qui le rend à la fois léger et durable. Sa structure innovante permet une utilisation facile dans divers contextes, que ce soit pour des tâches professionnelles ou des loisirs. Ce produit est un excellent choix pour ceux qui recherchent une solution polyvalente, capable de s'adapter à plusieurs scénarios d'utilisation. Grâce à sa conception avancée et à sa finition soignée, cet objet offre non seulement une fonctionnalité optimale, mais également une esthétique agréable."
    }
];

function home(req, res) {
    res.render('pages/home',{produits: produits})
}

function contact(req, res) {
    res.render('pages/contact')
}

function about(req, res) {
    res.render('pages/about')
}

function getproduct(req, res) {
    let produit = produits.find(produit => produit.id == req.params.id)
    res.render('pages/produit', {produit: produit})
}

async function sendContact(req,res) {
  try {
    const contact = await contactSchema.validate(req.body,{abortEarly:false});
    const info = await transporter.sendMail({
      from: 'goodformateur237@gmail.com', // sender address
      to: "goodformateur237@gmail.com", // list of receivers
      subject: "New contact from website", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>message de ${req.body.nom}</b><br><br>${req.body.description}`, // html body
    });
    req.flash('success', "Votre message a bien été envoyé")
    res.redirect('back')
  } catch (error) {
    req.flash('errors', error.inner)
    res.redirect('/contact')
  }
}

module.exports = {
    home,
    contact,
    about,
    getproduct,
    sendContact
}