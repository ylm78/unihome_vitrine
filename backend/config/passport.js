import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/User.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Configuration de la stratégie Google OAuth
if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  // Construire l'URL complète du callback
  const BACKEND_URL = process.env.BACKEND_URL || process.env.PORT 
    ? `http://localhost:${process.env.PORT || 3001}`
    : 'http://localhost:3001';
  const callbackURL = `${BACKEND_URL}/api/auth/google/callback`;
  
  console.log('🔐 Configuration Google OAuth:');
  console.log('   Callback URL:', callbackURL);
  
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: callbackURL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('🔐 Passport Strategy - Profile reçu:', {
            id: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName
          });
          
          const user = await User.createOrUpdateGoogleUser(profile);
          console.log('✅ Passport Strategy - Utilisateur créé/mis à jour:', user.email);
          return done(null, user);
        } catch (error) {
          console.error('❌ Passport Strategy - Erreur:', error);
          console.error('Stack:', error.stack);
          return done(error, null);
        }
      }
    )
  );
}

// Sérialiser l'utilisateur pour la session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Désérialiser l'utilisateur depuis la session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;

