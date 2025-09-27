export default function handler(req, res) {
    const { x, y } = req.query;

    const isNatural = n => {
        const num = Number(n);
        return Number.isInteger(num) && num > 0;
    };

    if (!isNatural(x) || !isNatural(y)) {
        res.setHeader('Content-Type', 'text/plain');
        return res.status(200).send('NaN');
    }

    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const result = (Number(x) * Number(y)) / gcd(Number(x), Number(y));

    res.status(200).send(String(result));
}
