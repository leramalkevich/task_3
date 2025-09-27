export default function handler(req, res) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'HEAD') {
        res.status(200).end();
        return;
    }

    const { x, y } = req.query;

    const isNatural = n => {
        const num = Number(n);
        return Number.isInteger(num) && num > 0;
    };

    if (!isNatural(x) || !isNatural(y)) {
        return res.status(200).send('NaN');
    }

    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const lcm = (a, b) => (a * b) / gcd(a, b);

    const result = lcm(Number(x), Number(y));

    res.status(200).send(String(result).trim());
}
