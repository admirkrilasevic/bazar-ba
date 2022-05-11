import { Link } from "react-router-dom";
import styles from "./PageLayout.module.css";

function PageLayout({title, message, messageStyle, didYouMean, children}) {

    return (
        <div>
            { title &&
            <div className={styles.pageHeader}>
                <span>{title}</span>
            </div>
            }
            { message &&
            <div className={messageStyle}>
                <p>{message}</p>
            </div>
            }
            { (didYouMean.length > 0) &&
            <div className={styles.didYouMeanContainer}>
                <p className={styles.didYouMean}>Did you mean?</p>
                {didYouMean.map((suggestion) => (
                    <Link to={`/shop/0?searchText=${suggestion}`} className={styles.suggestion}>{suggestion}</Link>
                ))}
            </div>
            }
            <div className={styles.pageContent}>
                {children}
            </div>
        </div>
    );
}

export default PageLayout;
