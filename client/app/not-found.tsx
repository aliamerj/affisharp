import Link from "next/link";
import { Frown } from "lucide-react"; // Import FontAwesome Frown Icon

const NotFound = () => {
  return (
    <div style={styles.container}>
      <Frown style={styles.icon} />
      <h1 style={styles.title}>404</h1>
      <p style={styles.description}>
        {"Oops! The page you're looking for doesn't exist."}
      </p>
      <Link href="/" style={styles.button}>
        Go Back Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column", // TypeScript requires specifying the type for 'flexDirection'
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center" as "center",
    animation: "appear 0.5s ease-in-out",
  },
  icon: {
    fontSize: "4rem",
    color: "#135D66",
    animation: "bounce 1s infinite",
  },
  title: {
    fontSize: "6rem",
    fontWeight: "bold",
    margin: 0,
    color: "#333",
  },
  description: {
    fontSize: "1.5rem",
    margin: "1rem 0",
    color: "#666",
  },
  button: {
    backgroundColor: "#135D66",
    color: "white",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
};

export default NotFound;
