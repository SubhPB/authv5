// BYIMAAN

/**
* 
* PROJECT SETUP :-
*    npx create-next-app@latest ./
* 
* NEXT-AUTH INIT (version 5) :-
*   [a]
*      i) npm install next-auth@beta
*      ii) npx auth secret (# this will generate secret key e.g. AUTH_SECRET="<auth-secret-key>")
* 
*   [b] # src/auth.ts <!important/>
*       i) export const {handlers, signIn, signOut, auth} = NextAuth({...})
*       ii) Brief :-
*           - handlers will be used in api's because it hold GET & POST
*           - auth will be used as middleware  
* 
*   [c] # src/app/api/auth/[...nextauth]/route.ts
*       i) export {GET, POST} = handlers
* 
*   [d] #src/middleware
*       i) export {auth as middleware}
* 
* DATABASE :-
*   [a] npm install mongoose (Object Data Modeling)
*   
*   [b] Setup User or other models in /src/models/userModels
* 
*   [c] npm i bcryptjs (bcrypt is built using C++ and bcryptjs using JS)
* 
* UTILS :-
*   [a] Shadcn-ui
*       - npx shadcn-ui@latest init
*       - npx shadcn-ui@latest add Card
*       - npx shadcn-ui@latest Input
*       
 */