import { useEffect, useRef, useState } from "react";

const InfiniteScroll = () => {
    const target = useRef(null);
    const [loading, setLoading ] = useState(false);
    const page = useRef(1);
}
useEffect(() => {
    observer.observe(target.current);
}, []);

export default InfiniteScroll;