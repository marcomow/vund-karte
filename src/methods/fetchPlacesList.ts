export const fetchPlacesList: () => Promise<any[]> = async (): Promise<any[]> => {
    const url: string = `https://script.google.com/macros/s/AKfycbw8e4qzc4d0j7r4luNsFm1zJb1MyslMPsePjB-_elzi0Cpwdgq3uuzCwuxXJ9n348YD/exec`;
    const placesList: any[] = await (await fetch(url)).json() as any[];
    return placesList;
}