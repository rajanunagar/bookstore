import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

export async function currentAuthenticatedUser() {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (err) {
    console.log(err);
  }
}

export async function getSessionData() {
    try{
        const { accessToken } = (await fetchAuthSession()).tokens ?? {};
        return accessToken?.payload;
    }
    catch(err) {
        console.log(err);
    }
}

export const loggedInuserIsAdminOrNot = async ():Promise<boolean>=>{
  const session = await getSessionData();
  const groups = session && session?.["cognito:groups"] || [];
  if(groups && groups.length>0 && groups.includes('admin')) {
   return true;
  }
  return false;
}