const express = require("express");
const mysql = require("mysql2");
 
const app = express();
app.use(express.json());
 
const connection = mysql.createConnection({
    host:"localhost",
    port: 3307,
    user:"root",
    password:"",
    database:"szerviz_db"
})
 
connection.connect((err)=> {
    if (err) {
        console.error("hiba:", err);
        return;
    }
 
    console.log("van kapcsolat");
 
 
 
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`A szerver fut a ${PORT} porton`);
});

app.get("/szolgaltatasok", (req, res) => {
    const sql = `
        SELECT szolgaltatasok.id, szolgaltatasok.megnevezes, szolgaltatasok.alapar,
        szolgaltatasok.munkaido_perc, szolgaltatasok.aktiv, kategoriak.nev AS kategoria_nev
        FROM szolgaltatasok
        INNER JOIN kategoriak ON szolgaltatasok.kategoria_id = kategoriak.id
        ORDER BY szolgaltatasok.alapar ASC
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

app.get("/szolgaltatasok/elerheto", (req, res) => {
    const sql = `
        SELECT * FROM szolgaltatasok
        WHERE aktiv = 1
        AND munkaido_perc <= 60
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

app.get("/szolgaltatasok/kereses/:szoveg", (req, res) => {
    const sql = `
        SELECT * FROM szolgaltatasok
        WHERE megnevezes LIKE ?
    `;

    connection.query(sql, [`%${req.params.szoveg}%`], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

app.get("/kategoriak/statisztika", (req, res) => {
    const sql = `
        SELECT kategoriak.nev AS kategoria_nev, COUNT(szolgaltatasok.id) AS szolgaltatasok_szama, ROUND(AVG(szolgaltatasok.alapar), 1) AS atlagos_alapar
        FROM kategoriak
        INNER JOIN szolgaltatasok ON kategoriak.id = szolgaltatasok.kategoria_id
        GROUP BY kategoriak.id, kategoriak.nev
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});


app.get("/szolgaltatasok/dragak", (req, res) => {
    const sql = `
        SELECT megnevezes, alapar, munkaido_perc
        FROM szolgaltatasok WHERE alapar > 25000
        ORDER BY munkaido_perc DESC
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});