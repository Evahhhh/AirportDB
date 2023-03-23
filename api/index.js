

// const Plane = require("./plane");

// (async () => {
//     try {
//         await mongoose.connect("mongodb://localhost/testMongoose");
//         console.log("Connexion réussie avec la base de donnée");

//         const plane = await Plane.create({
//             name: "Airbus A380",
//             ref: "A380",
//             nbPassenger: 500,
//         });

//         const result = await plane.save();
//         console.log(result);

//     }catch(error){
//         console.log(error.message);
//     }
// })();