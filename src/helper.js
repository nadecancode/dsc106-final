// Cumulative distribution function for the standard normal distribution
export function pnorm(x, mean = 0, stdDev = 1) {
    // Using the error function (erf) approximation
    const z = (x - mean) / Math.sqrt(2 * stdDev * stdDev);
    return 0.5 * (1 + erf(z));
}

// Error function approximation
function erf(x) {
    // constants
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    // Save the sign of x
    const sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);

    // A&S formula 7.1.26
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
}

// Quantile function for the standard normal distribution
export function qnorm(p, mean = 0, stdDev = 1) {
    // Using the Beasley-Springer-Moro algorithm for approximation
    if (p < 0 || p > 1) {
        throw new Error('The probability p must be between 0 and 1.');
    }

    const a1 = -39.6968302866538;
    const a2 = 220.946098424521;
    const a3 = -275.928510446969;
    const a4 = 138.357751867269;
    const a5 = -30.6647980661472;
    const a6 = 2.50662827745924;

    const b1 = -54.4760987982241;
    const b2 = 161.585836858041;
    const b3 = -155.698979859887;
    const b4 = 66.8013118877197;
    const b5 = -13.2806815528857;

    const c1 = -0.00778489400243029;
    const c2 = -0.322396458041136;
    const c3 = -2.40075827716184;
    const c4 = -2.54973253934373;
    const c5 =  4.37466414146497;
    const c6 =  2.93816398269878;

    const d1 =  0.00778469570904146;
    const d2 =  0.32246712907004;
    const d3 =  2.445134137143;
    const d4 =  3.75440866190742;

    const plow = 0.02425;
    const phigh = 1 - plow;

    let q, r;

    if (p < plow) {
        q = Math.sqrt(-2 * Math.log(p));
        return mean + stdDev * (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    } else if (p <= phigh) {
        q = p - 0.5;
        r = q * q;
        return mean + stdDev * (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
            (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    } else {
        q = Math.sqrt(-2 * Math.log(1 - p));
        return mean + stdDev * -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
}
