export class StatusName {
    private readonly value: string;
  
    constructor(value: string) {
      if (value.length < 1 && value.length > 255) {
        throw new Error("Status name must be between 1 and 255 characters");
      }
  
      this.value = value;
    }
  
    getValue(): string {
      return this.value;
    }
  }
  