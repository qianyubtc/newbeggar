// 赛博要饭：一个可以要饭、施舍、留言、上榜、开分站的小站。收款走 BinancePayTool 网关。
package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

const version = "0.1.0"

func main() {
	cfgPath := flag.String("config", "./config.env", "配置文件路径（KEY=VALUE，环境变量优先）")
	genKey := flag.Bool("gen-key", false, "生成一个随机 ADMIN_TOKEN")
	showVer := flag.Bool("version", false, "打印版本")
	flag.Parse()

	if *showVer {
		fmt.Println("newbeggar", version)
		return
	}
	if *genKey {
		fmt.Println(randToken())
		return
	}
	cfg, err := loadConfig(*cfgPath)
	if err != nil {
		log.Fatalf("[fatal] %v", err)
	}
	app, err := newApp(cfg)
	if err != nil {
		log.Fatalf("[fatal] 初始化失败: %v", err)
	}
	defer app.st.Close()

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	srv := &http.Server{Addr: cfg.Listen, Handler: app, ReadHeaderTimeout: 10 * time.Second, ReadTimeout: 20 * time.Second, WriteTimeout: 30 * time.Second, IdleTimeout: 60 * time.Second}
	go func() {
		<-ctx.Done()
		shutCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		srv.Shutdown(shutCtx)
	}()
	mode := "直接转账"
	if cfg.BPGURL != "" {
		mode = "网关 " + cfg.BPGURL
	}
	log.Printf("[info] newbeggar %s 监听 %s，对外 %s，主站收款：%s，开站：%v", version, cfg.Listen, cfg.BaseURL, mode, cfg.SubsitesEnabled)
	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("[fatal] %v", err)
	}
	log.Printf("[info] 已退出")
}
