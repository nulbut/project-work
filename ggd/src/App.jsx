import "./App.css";

function App() {
  return (
    <div className="App">
      <Header lstate={loginState} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login sucLogin={sucLogin} />} />
        <Route path="/main" element={<Main />} />
        <Route path="/write" element={<Write />} />
        <Route path="/board" element={<Board />} />
        <Route path="/update" element={<Update />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/changepass" element={<ChangePass />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
