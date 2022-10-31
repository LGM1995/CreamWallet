import World from "./World";

export default function Hello() {
  return (
      <> {/* 빈 태그는 div와 같다. */}
          <h1 style={{
                  color : '#f00',
                  borderRight : '2px soild #000',
                  marginBottom : '30px',
                  opacity : 0.5, // 숫자인 경우 '' 생략가능
              }}
          >Hello</h1>
        <World/> {/*컴포넌트 안에 컴포넌트 구성이 가능 */}
      </>
  );
}
