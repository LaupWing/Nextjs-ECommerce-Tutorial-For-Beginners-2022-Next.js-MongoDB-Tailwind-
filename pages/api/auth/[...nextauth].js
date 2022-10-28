import NextAuth from "next-auth/next";

export default NextAuth({
   session:{
      strategy: "jwt"
   }
})