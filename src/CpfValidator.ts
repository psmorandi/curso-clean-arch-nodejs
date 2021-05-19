export default class CpfValidator {
    private FACTOR_DIGIT_1 = 10;
    private FACTOR_DIGIT_2 = 11;
    private MAX_DIGITS_1 = 9;
    private MAX_DIGITS_2 = 10;

    isValid(cpf: string): boolean {
        const cpfOnlyNumbers = this.extractDigits(cpf);
        if(this.isInvalidLength(cpfOnlyNumbers)) return false;
        if(this.isBlockedCpf(cpfOnlyNumbers)) return false;
        const firstVerificationDigit = this.calculateVerificationDigit(cpfOnlyNumbers, this.FACTOR_DIGIT_1, this.MAX_DIGITS_1);
        const secondVerificationDigit = this.calculateVerificationDigit(cpfOnlyNumbers, this.FACTOR_DIGIT_2, this.MAX_DIGITS_2);
        let calculatedVerificationDigit = `${firstVerificationDigit}${secondVerificationDigit}`;
        return this.getVerificationDigits(cpfOnlyNumbers) === calculatedVerificationDigit;
    }    

    private extractDigits(cpf: string): string {
        return cpf.replace(/\D/g, "");
    }

    private isInvalidLength(cpf: string): boolean {
        return cpf.length !== 11;
    }

    private isBlockedCpf(cpf: string): boolean {
        const [firstDigit] = cpf;
        return cpf.split("").every(digit => digit === firstDigit);
    }

    private calculateVerificationDigit(cpf: string, factor: number, max: number) {
        let total = 0;
        let multiplierFactor = factor;
        for (const digit of this.toDigitArray(cpf).slice(0, max)) {
            total += digit * multiplierFactor--;            
        }
        const resultModule11 = total % 11;

        return (resultModule11 < 2)? 0 : (11 - resultModule11);
    }
    
    private toDigitArray(cpf: string): Array<number> {
        return [...cpf].map(digit => parseInt(digit));
    }

    private getVerificationDigits(cpf: string): string {
        return cpf.slice(9);
    }
}