import { checkIfAccountExists, createAccount } from "../../services/apiGoogleAccount";
import { addGoogleAcc, createGoogleProfile, getProfileByName } from "../../services/apiProfile";
  {/* ---------------------------------------------------------------------
    Function: handleCallbackResponse
    Purpose: Handle the response from Google Sign-In
    --------------------------------------------------------------------- */}
 export const handleCallbackResponse = async (response: { credential: string }, setUser:any, setIsAuthenticated:any) => {
    // Decode the JWT token
    const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
    
    // Set user information
    setUser({
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture
    });
    
    setIsAuthenticated(true);
    
    // Tokens stored in local each time user logs in
    localStorage.setItem('google_token', response.credential);
    localStorage.setItem('user_id', decodedToken.sub);
    localStorage.setItem('Email', decodedToken.email);
    const doesExist = await checkIfAccountExists(decodedToken.sub); //Check if account exists in db
    
    if(doesExist){
      const profile:any = await getProfileByName(decodedToken.name);
      localStorage.setItem('profile_id', profile.id);
    } else {   //Creates the account if it does not already exist in the db
      const acc = {
          googleId: decodedToken.sub,
          name: decodedToken.name,
          email: decodedToken.email,
      };
  
      try {
          const createdAccount = await createAccount(acc); //Create account in db
          //Set a profile with the account
          const profile ={
            name: decodedToken.name,
            points: 0,
          }

          const response = await createGoogleProfile(profile);
          const profileId = response.id;
          localStorage.setItem('profile_id', profileId);
          await addGoogleAcc(profileId, decodedToken.sub);

      } catch (error) {
          console.error("Error in account creation flow:", error);
      }
  }
  
  };