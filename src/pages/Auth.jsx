import React, { useState } from "react";
import "./Auth.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

const googleProvider = new GoogleAuthProvider();

export default function Auth({ onAuth, onClose }) {
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onAuth(); // Set user on Google login
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-modal" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(30,30,30,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div className="auth-card" style={{
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        padding: '2.5rem 2rem',
        minWidth: '320px',
        maxWidth: '90vw',
        textAlign: 'center',
        position: 'relative',
      }}>
        <button className="auth-close" onClick={onClose} style={{
          position: 'absolute',
          top: '18px',
          right: '18px',
          background: 'none',
          border: 'none',
          fontSize: '2rem',
          color: '#c6286e',
          cursor: 'pointer',
        }}>
          ×
        </button>
        <h2 style={{
          fontWeight: 700,
          fontSize: '2rem',
          marginBottom: '2rem',
          background: 'linear-gradient(90deg, #c6286e, #e04a6a, #fa8072)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>Welcome Back</h2>
        <button className="auth-btn google" onClick={googleLogin} style={{
          padding: '1rem 2.5rem',
          fontSize: '1.1rem',
          borderRadius: '30px',
          border: 'none',
          fontWeight: 600,
          background: 'linear-gradient(90deg, #c6286e, #e04a6a, #fa8072)',
          color: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          marginTop: '1rem',
        }}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
